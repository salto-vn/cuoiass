
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Image from "@material-ui/icons/Image";
import Apps from "@material-ui/icons/Apps";
import Person from "@material-ui/icons/Person";
import RateReview from "@material-ui/icons/RateReview";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../components/Dashboard/Dashboard";
import StaffScreen from '../components/Staff/Index';
import FeedbackScreen from '../components/Feedback/Index';
import ViewDetailFeedbackScreen from '../components/Feedback/ViewDetail';
import { BookingScreen } from '../components/Booking/Index';
import pagesRoutes from './pages';
// import UserProfile from "views/UserProfile/UserProfile.jsx";
// import TableList from "views/TableList/TableList.jsx";


var pages = [
  {
    path: "/timeline-page",
    name: "Timeline Page",
    mini: "TP",
    // component: TimelinePage
  },
  {
    path: "/user-page",
    name: "User Profile",
    mini: "UP",
    // component: UserProfile
  },
  {
    path: "/rtl/rtl-support-page",
    name: "RTL Support",
    mini: "RS",
    // component: RTLSupport
  }
].concat(pagesRoutes);

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: DashboardPage
  },
  {
    path: "/staff",
    name: "Nhân Viên",
    icon: Person,
    component: StaffScreen
  },
  {
    path: "/review",
    name: "Đánh giá",
    icon: RateReview,
    component: FeedbackScreen
  },
  {
    collapse: true,
    path: "-page",
    name: "Pages",
    state: "openPages",
    icon: Image,
    views: pages
  },
  // {
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: Apps,
  //   views: [
  //     {
  //       path: "/components/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons
  //     },
  //     {
  //       path: "/components/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem
  //     },
  //     {
  //       path: "/components/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels
  //     },
  //     {
  //       path: "/components/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert
  //     },
  //     {
  //       path: "/components/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications
  //     },
  //     { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
  //     {
  //       path: "/components/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: "content_paste",
  //   views: [
  //     {
  //       path: "/forms/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms
  //     },
  //     {
  //       path: "/forms/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms
  //     },
  //     {
  //       path: "/forms/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms
  //     },
  //     { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: GridOn,
  //   views: [
  //     {
  //       path: "/tables/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables
  //     },
  //     {
  //       path: "/tables/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables
  //     },
  //     {
  //       path: "/tables/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables
  //     }
  //   ]
  // },
  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: Place,
  //   views: [
  //     {
  //       path: "/maps/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps
  //     },
  //     {
  //       path: "/maps/full-screen-maps",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap
  //     },
  //     {
  //       path: "/maps/vector-maps",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap
  //     }
  //   ]
  // },
  // { path: "/widgets", name: "Widgets", icon: WidgetsIcon, component: Widgets },
  // { path: "/charts", name: "Charts", icon: Timeline, component: Charts },
  // { path: "/calendar", name: "Calendar", icon: DateRange, component: Calendar },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;