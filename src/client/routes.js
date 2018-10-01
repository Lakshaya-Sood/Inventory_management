import injectTapEventPlugin from 'react-tap-event-plugin'
import Authorization from './Authorization'
import { PERMISSIONS } from './constants/constants'
// import containers
import Base from './components/base/Base'
import Home from './components/base/Home'
import Product from './containers/ProductContainer'
import Recipes from './containers/RecipesContainer'
import Dashboard from './containers/DashboardContainer'
import Forecast from './containers/ForecastContainer'
injectTapEventPlugin()

// create HOC by passing in the roles
// HOC will then be responsible to show/hide content based on
// allowed roles
const TechAdmin = Authorization([PERMISSIONS.TECH_ADMIN])

const rootRoute = {
  path: __BASENAME__,
  component: Base, // this is the root (shell) component
  indexRoute: { component: Home }, // by default,this component will be shown
  childRoutes: [
    {
      component: Home,
      childRoutes: [
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'product-management',
          component: Product
        },
        {
          path: 'recipe-management',
          component: Recipes
        },
        {
          path: 'forecast',
          component: Forecast
        },
        {
          path: 'reports',
          component: Recipes
        }
      ]
    }
    // {
    //   path: 'some-path',
    //   component: Component
    // }
  ]
}
module.exports = rootRoute
