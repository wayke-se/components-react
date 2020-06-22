import { useContext } from 'react';

import { SettingsContext } from '../context/settings-context';

const useSettings = () => useContext(SettingsContext);

export default useSettings;
