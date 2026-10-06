import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  UserCheck,
  UserX
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useSEO } from '../../utils/useSEO';
import { Card, Badge, Button, Modal, Skeleton, EmptyState } from '../../components/common';

const ROLES = ['admin', 'editor', 'viewer'];

export default function AdminUsersPage() {
  useSEO({ title: 'User Roles & Access Control — NOVA Admin' });

  const { user: currentAdmin } = useAuth();
  const { success, error: toastError } = useToast();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deletingUser, setDeletingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getAllUsers();
      if (res?.success) {
        setUsers(res.data || []);
      }
    } catch (err) {
      toastError(err.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, { role: newRole });
      success(`User role updated to ${newRole}.`);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      toastError(err.message || 'Failed to update role');
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    try {
      await adminService.deleteUser(deletingUser._id);
      success(`User "${deletingUser.name}" deleted.`);
      setIsDeleteModalOpen(false);
      setDeletingUser(null);
      fetchUsers();
    } catch (err) {
      toastError(err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">User Accounts & Role Permissions</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage administrative credentials, role-based access control (RBAC), and user access permissions.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <Card className="bg-slate-900 border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <EmptyState
              icon={Users}
              title="No users found"
              description="No registered admin user accounts."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Access Role</th>
                  <th className="py-3.5 px-4">Created Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => {
                  const isCurrent = currentAdmin?.id === u._id;
                  return (
                    <tr key={u._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                            {u.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] text-cyan-400 font-mono font-normal">(You)</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          disabled={isCurrent}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className={`bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-semibold focus:outline-none capitalize ${
                            u.role === 'admin' ? 'text-cyan-400 font-bold' : 'text-slate-300'
                          }`}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {!isCurrent && (
                          <button
                            onClick={() => { setDeletingUser(u); setIsDeleteModalOpen(true); }}
                            className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Delete User Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User Account"
        size="sm"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to delete user account <strong className="text-white">{deletingUser?.name}</strong> ({deletingUser?.email})?
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete User</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
