import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { JobOpenings } from "./pages/JobOpenings";
import { CreateJob } from "./pages/CreateJob";
import { JobDetail } from "./pages/JobDetail";
import { ConnectedPortals } from "./pages/ConnectedPortals";
import { ImportCenter } from "./pages/ImportCenter";
import { DirectApply } from "./pages/DirectApply";
import { ManualUpload } from "./pages/ManualUpload";
import { HistoricalImport } from "./pages/HistoricalImport";
import { EmailIngestion } from "./pages/EmailIngestion";
import { ReviewQueue } from "./pages/ReviewQueue";
import { Applications } from "./pages/Applications";
import { CandidateProfile } from "./pages/CandidateProfile";
import { ShortlistView } from "./pages/ShortlistView";
import { CandidateComparison } from "./pages/CandidateComparison";
import { AuditLog } from "./pages/AuditLog";
import { UserManagement } from "./pages/UserManagement";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "jobs", Component: JobOpenings },
      { path: "jobs/create", Component: CreateJob },
      { path: "jobs/:id", Component: JobDetail },
      { path: "jobs/:id/applications", Component: Applications },
      { path: "jobs/:id/applications/:candidateId", Component: CandidateProfile },
      { path: "applications", Component: Applications },
      { path: "shortlist", Component: ShortlistView },
      { path: "shortlist/compare", Component: CandidateComparison },
      { path: "portals", Component: ConnectedPortals },
      { path: "imports", Component: ImportCenter },
      { path: "imports/direct-apply", Component: DirectApply },
      { path: "imports/manual-upload", Component: ManualUpload },
      { path: "imports/historical", Component: HistoricalImport },
      { path: "imports/email", Component: EmailIngestion },
      { path: "imports/review-queue", Component: ReviewQueue },
      { path: "audit-log", Component: AuditLog },
      { path: "users", Component: UserManagement },
      { path: "settings", Component: Settings },
    ],
  },
]);
