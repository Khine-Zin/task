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
import ContentDetail from "./Pages/Calendar/ContentDetail.jsx";

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
        path: "/calendar/headline",
        element: (
          <ProtectedRoute >
            <HeadlineDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/calendar/content",
        element: (
          <ProtectedRoute >
            <ContentDetail/>
          </ProtectedRoute>
        ),
      },
    
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
        path: "/history/detail",
        element: (
          <ProtectedRoute allowedRoles="admin">
            <HistoryDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
