import userResolver from './user'
import bookingResolver from './booking'
import eventResolver from './event'

const rootResolver = {
    ...userResolver,
    ...bookingResolver,
    ...eventResolver
}
module.exports = rootResolver