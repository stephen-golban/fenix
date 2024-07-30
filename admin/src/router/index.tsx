import { LoggedOutLayout } from '../layouts';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import {
  LoginScreen,
  CategoriesScreen,
  EditCategoriesScreen,
  CreateCategoriesScreen,
  CreateProductScreen,
  EditProductScreen,
  ViewProductScreen,
  ProductsScreen,
} from '../screens';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <LoggedOutLayout>
            <LoginScreen />
          </LoggedOutLayout>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/categories" />} />
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/categories/create" element={<CreateCategoriesScreen />} />
        <Route path="/categories/edit/:id" element={<EditCategoriesScreen />} />

        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/products/create" element={<CreateProductScreen />} />
        <Route path="/products/edit/:id" element={<EditProductScreen />} />
        <Route path="/products/view/:id" element={<ViewProductScreen />} />
      </Route>
    </>,
  ),
);

export default router;
