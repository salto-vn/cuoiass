
// @material-ui/icons

// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import ViewDetailFeedbackScreen from '../components/Feedback/ViewDetail';
import BookingSearchResultScreen from '../components/Booking/Results';
import BookingSearchScreen from '../components/Booking/Index';
import DetailBookingScreen from '../components/Booking/Detail';
export const routes =
  [
    {
      path: "/review/:id",
      component: ViewDetailFeedbackScreen,
      name: "Đánh giá của khách hàng",
    },
    {
      path: "/booking/search/:search",
      component: BookingSearchResultScreen,
      name: "Order",
    },
    {
      path: "/booking/detail/:booked_cd",
      component: DetailBookingScreen,
      name: "Chi tiết đơn hàng"
    },
    {
      path: "/booking/:search",
      component: BookingSearchScreen,
      name: "Tìm kiếm đơn hàng"
    },
    
  ];

