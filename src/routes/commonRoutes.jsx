import Login from '../pages/Login';

const commonRoutes = [
  {
    path: 'login',
    element: <Login />,
    children: <></>,
  },
  // {
  //   path: 'reset-password',
  //   element: <ResetPassword />,
  //   children: <></>,
  // },
  // {
  //   path: 'unauthorized',
  //   element: <Unauthorized />,
  //   children: <></>,
  // },
  // {
  //   path: 'profile',
  //   element: <ProtectedRoute />,
  //   children: <Route index element={<Profile />} />,
  // },
  // {
  //   path: '*',
  //   element: <ProtectedRoute />,
  //   children: <Route index element={<NotFound />} />,
  // },
];

export default commonRoutes;
