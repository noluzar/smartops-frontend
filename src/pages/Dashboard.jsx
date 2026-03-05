import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/authStore';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await api.get('/api/projects');
        setProjects(projectsRes.data);

        const taskPromises = projectsRes.data.map((p) =>
          api.get(`/api/tasks/project/${p.id}`)
        );
        const taskResults = await Promise.all(taskPromises);
        const allTasks = taskResults.flatMap((r) => r.data);
        setTasks(allTasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pendingTasks = tasks.filter((t) => t.status === 'TODO').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const doneTasks = tasks.filter((t) => t.status === 'DONE').length;
  const totalTasks = tasks.length;
  const productivity = totalTasks > 0 ? ((doneTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 rounded-lg bg-[#2b8cee] flex items-center justify-center text-white">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <div>
            <h1 className="text-slate-900 font-bold text-lg leading-tight">SmartOps</h1>
            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Suite v1.0</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#2b8cee]/10 text-[#2b8cee] font-medium" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">folder</span>
            <span>Projects</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors" href="#">
            <span className="material-symbols-outlined">check_box</span>
            <span>Tasks</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50">
            <div className="size-9 rounded-full bg-[#2b8cee] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 truncate">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">

        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
          </div>
          <button className="bg-[#2b8cee] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#2b8cee]/90 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            New Project
          </button>
        </header>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-slate-400 text-sm">Loading dashboard...</div>
          </div>
        ) : (
          <div className="p-8 max-w-7xl mx-auto w-full space-y-8">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <span className="material-symbols-outlined">assignment</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Active Projects</p>
                <h3 className="text-3xl font-bold mt-1">{projects.length}</h3>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-lg bg-orange-50 text-orange-600">
                    <span className="material-symbols-outlined">pending_actions</span>
                  </span>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                    {inProgressTasks} In Progress
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Pending Tasks</p>
                <h3 className="text-3xl font-bold mt-1">{pendingTasks}</h3>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <span className="material-symbols-outlined">trending_up</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                    {doneTasks} Done
                  </span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Task Completion</p>
                <h3 className="text-3xl font-bold mt-1">{productivity}%</h3>
              </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold">Current Active Projects</h3>
              </div>
              {projects.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2 block">folder_open</span>
                  No projects yet. Create your first project!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                        <th className="px-6 py-4">Project Name</th>
                        <th className="px-6 py-4">Owner</th>
                        <th className="px-6 py-4">Members</th>
                        <th className="px-6 py-4">Tasks</th>
                        <th className="px-6 py-4">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-sm">{project.name}</div>
                            <div className="text-xs text-slate-500">{project.description || 'No description'}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{project.ownerName}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{project.memberCount}</td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-[#2b8cee]/10 text-[#2b8cee]">
                              {project.taskCount} tasks
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold">Recent Tasks</h3>
              </div>
              {tasks.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2 block">check_box</span>
                  No tasks yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                        <th className="px-6 py-4">Task</th>
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Assignee</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tasks.slice(0, 10).map((task) => (
                        <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-sm">{task.title}</div>
                            <div className="text-xs text-slate-500">{task.description || ''}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{task.projectName}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{task.assigneeName}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full
                              ${task.status === 'DONE' ? 'bg-emerald-100 text-emerald-600' :
                                task.status === 'IN_PROGRESS' ? 'bg-[#2b8cee]/10 text-[#2b8cee]' :
                                'bg-slate-100 text-slate-600'}`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}