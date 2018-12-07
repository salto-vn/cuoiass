
// @material-ui/icons

// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import ViewDetailFeedbackScreen from '../components/Feedback/ViewDetail';
import { BookingScreen } from '../components/Booking/Index';
export const routes =
  [
    {
      path: "/review/:id",
      component: ViewDetailFeedbackScreen,
      name: "Đánh giá của khách hàng",
    },
    {
      path: "/booking/:id",
      component: BookingScreen,
      name: "Order",
    }
  ];

