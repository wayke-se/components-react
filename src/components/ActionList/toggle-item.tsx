import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonContent, ButtonPrimary, ButtonSecondary } from '../Button';
import { RepeatTiny } from '../Repeat';

interface ToggleItemProps {
  title: string;
  value: string;
  type: 'tel' | 'mailto';
  /** Overrides the href target (without the `mailto:`/`tel:` scheme). Defaults to `value`. */
  href?: string;
  primary?: boolean;
  onClickVisible?: () => void;
  onClickValue?: () => void;
}

const ToggleItem = ({
  title,
  value,
  type,
  href,
  primary,
  onClickVisible,
  onClickValue,
}: ToggleItemProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const _onClickValue = useCallback(() => {
    if (onClickValue) {
      onClickValue();
    }
  }, [onClickValue]);

  const onClick = useCallback(() => {
    if (!visible) {
      setVisible(true);
      if (onClickVisible) {
        onClickVisible();
      }
    }
  }, [visible, onClickVisible]);

  const visibleTitle =
    type === 'tel'
      ? t('item.actions.callNumber')
      : type === 'mailto'
        ? t('item.actions.sendEmailTo')
        : '';

  const Button = primary ? ButtonPrimary : ButtonSecondary;

  return (
    <RepeatTiny>
      {visible ? (
        <Button
          onClick={_onClickValue}
          as="a"
          href={`${type}:${href || value}`}
          title={`${visibleTitle} ${value}`}
          fullWidth
        >
          <ButtonContent>{value}</ButtonContent>
        </Button>
      ) : (
        <Button onClick={onClick} title={title} fullWidth>
          <ButtonContent>{title}</ButtonContent>
        </Button>
      )}
    </RepeatTiny>
  );
};

export default ToggleItem;
