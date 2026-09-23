import { Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

function ProjectDetailRoute() {
  const { slug } = useParams()
  return <ProjectDetail key={slug} />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<ProjectDetailRoute />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
