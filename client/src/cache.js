import { InMemoryCache, makeVar } from '@apollo/client'

// Define apollo client cache and reactive variables here
// testIdVar can be used in functional components with the 
// testId = useReactiveVar(testIdVar) hook. Anytime you change the value
// of testId in the cache by calling testIdVar(newVal), all components
// subscribed to this var via the useReactiveVar hook will be updated
// with the new value.  For more details, see:
// https://www.apollographql.com/docs/react/local-state/reactive-variables/

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                testId: {
                    read() {
                        return testIdVar();
                    }
                }
            }
        }
    }
})

export const testIdVar = makeVar(null);