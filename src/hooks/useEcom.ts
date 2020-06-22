const useEcom = (ecomUrl?: string) => {
  if (ecomUrl) {
    import('@wayke-se/ecom').then(({ config }) => {
      config.bind({
        api: {
          address: ecomUrl,
        },
        /** Specifying an origin is optional **/
        origin: {
          topic: 'Wayke',
          channel: 'wayke.se',
        },
      });
    });
  }
};

export default useEcom;
