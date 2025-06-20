import DashboardPage from "./Pages/Dashboard";
import NotFoundPage from "./Pages/NotFoundPage.jsx";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import UserManagement from "./Pages/UserManagement/index.jsx";
import Category from "./Pages/Category/index.jsx";
import Brand from "./Pages/Brand/index.jsx";
import Task from "./Pages/Task/index.jsx";
import TaskDetail from "./Pages/Task/TaskDeatail.jsx";
import Detail from "./Pages/Task/Detail.jsx";
import Plan from "./Pages/Plan/index.jsx";
import PlanDetail from "./Pages/Plan/PlanDetail.jsx";
import Media from "./Pages/Media/index.jsx";
import MediaDetail from "./Pages/Media/MediaDetail.jsx";
import Calendar from "./Pages/Calendar/index.jsx";

import HeadlineDetail from "./Pages/Calendar/HeadlineDetail.jsx";

import Report from "./Pages/Report/index.jsx";
import ReportDetail from "./Pages/Report/ReportDetail.jsx";
import { ProtectedRoute } from './ProtectedRoute';
import History from "./Pages/History/index.jsx";
import HistoryDetail from "./Pages/History/HistoryDetail.jsx";
// import ContentDetail from "./Pages/Calendar/ContentDetail.jsx";
import Content from "./Pages/Task/content.jsx";
// import ContentCalendar from "./Pages/Calendar/ContentCalendar.jsx";
import CalendarPlan from "./Pages/Calendar/CalendarPlan.jsx";
import ContentPlanDetail from "./Pages/Calendar/ContentPlanDetail.jsx";
import RetrievedContentHeadline from "./Pages/RetrivedContent/index.jsx";
import RetrievedHeadlineDetail from "./Pages/RetrivedContent/HeadlineDetail.jsx";
import RetrievedContent from "./Pages/RetrivedContent/CalendarPlan.jsx";
import RetrievedContentDetail from "./Pages/RetrivedContent/ContentPlanDetail.jsx";
import CompleteDetail from "./Pages/Complete/CompleteDetail.jsx";
import Complete from "./Pages/Complete/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute >
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute >
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category",
        element: (
          <ProtectedRoute >
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brand",
        element: (
          <ProtectedRoute >
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: "/task",
        element: (
          <ProtectedRoute >
            <Task />
          </ProtectedRoute>
        ),
      },
      {
        path: "/content",
        element: (
          <ProtectedRoute >
            <Content />
          </ProtectedRoute>
        ),
      },
      {
        path: "/task/detail",
        element: (
          <ProtectedRoute >
            <TaskDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail",
        element: (
          <ProtectedRoute >
            <Detail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plan",
        element: (
          <ProtectedRoute >
            <Plan />
          </ProtectedRoute>
        ),
      },
      {
        path: "/plan/detail",
        element: (
          <ProtectedRoute >
            <PlanDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calendarContent/detail",
        element: (
          <ProtectedRoute >
            <ContentPlanDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/media",
        element: (
          <ProtectedRoute >
            <Media />
          </ProtectedRoute>
        ),
      },
      {
        path: "/media/detail",
        element: (
          <ProtectedRoute >
            <MediaDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calendar",
        element: (
          <ProtectedRoute >
            <Calendar />
          </ProtectedRoute>
        ),
      },
      
   
      {
        path: "/calendarPlan",
        element: (
          <ProtectedRoute >
            <CalendarPlan />
          </ProtectedRoute>
        ),
      },
  
      {
        path: "/calendar/headline",
        element: (
          <ProtectedRoute >
            <HeadlineDetail />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "/calendar/content",
      //   element: (
      //     <ProtectedRoute >
      //       <ContentDetail/>
      //     </ProtectedRoute>
      //   ),
      // },
    
      {
        path: "/report",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <Report />
          </ProtectedRoute>
        ),
      },
      {
        path: "/report/detail",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <ReportDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/history",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <History />
          </ProtectedRoute>
        ),
      },
       {
        path: "/retrived",
        element: (
          <ProtectedRoute >
            <RetrievedContentHeadline />
          </ProtectedRoute>
        ),
      },
        {
        path: "/retrived/detail",
        element: (
          <ProtectedRoute >
            <RetrievedHeadlineDetail/>
          </ProtectedRoute>
        ),
      },
        {
        path: "/retrivedContent",
        element: (
          <ProtectedRoute >
            <RetrievedContent/>
          </ProtectedRoute>
        ),
      },
        {
        path: "/retrivedContent/detail",
        element: (
          <ProtectedRoute >
            <RetrievedContentDetail/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/history/detail",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <HistoryDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/complete/detail",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <CompleteDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/complete",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <Complete />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
