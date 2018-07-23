import { connect } from 'react-redux'
import { IDiscoveryQueueProps, StoreDiscoveryQueue } from '../components/StoreDiscoveryQueue'

const mapStateToProps = () => ({
    href: '#',
    pictures: [
        'https://steamcdn-a.akamaihd.net/steam/apps/108800/capsule_616x353.jpg',
        "https://steamcdn-a.akamaihd.net/steam/apps/17410/capsule_616x353.jpg",
        "https://steamcdn-a.akamaihd.net/steam/apps/206500/ss_93ee5c02c743f2e5a4167a6b5bbb3c2aabb9722e.600x338.jpg",
        "https://steamcdn-a.akamaihd.net/steam/apps/214870/capsule_616x353.jpg",
    ]
} as IDiscoveryQueueProps)

export default connect(
    mapStateToProps,
)(StoreDiscoveryQueue)
