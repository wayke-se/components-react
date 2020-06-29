// import WaykeComposite from './layouts/WaykeComposite';
import WaykeSearch from './layouts/search/index';
import WaykeSearchItem from './layouts/searchItem/index';
import WaykeProvider from './providers/WaykeProvider';
import WaykeComposite from './layouts/WaykeCompositeWithProvider';
import WaykePubSub from './utils/pubsub/pubsub';

export { WaykeProvider, WaykeSearch, WaykeSearchItem, WaykePubSub };

export default WaykeComposite;
