import { lazy } from 'react';

export const Home = lazy(() => import('../pages/Home'));
export const About = lazy(() => import('../pages/About'));
export const Services = lazy(() => import('../pages/Service'));
export const Contact = lazy(() => import('../pages/Contact'));
export const Login = lazy(() => import('../auth/Login'));
export const Registration = lazy(() => import('../auth/Registration'));
export const Dashboard = lazy(() => import('../pages/dashboards/Dashboard'));