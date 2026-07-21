"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Shield, ShieldAlert, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface UserWithSubscription {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  isSubscribed: boolean;
}

interface UsersListClientProps {
  users: UserWithSubscription[];
  currentAdminId: string;
}

export default function UsersListClient({ users: initialUsers, currentAdminId }: UsersListClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState<UserWithSubscription[]>(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleToggleRole = async (userId: string, currentRole: string) => {
    if (userId === currentAdminId) {
      alert("Vous ne pouvez pas modifier votre propre rôle d'administrateur.");
      return;
    }

    const nextRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    
    setLoadingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      });

      if (response.ok) {
        setUsers(users.map((u) => u.id === userId ? { ...u, role: nextRole } : u));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleToggleSubscription = async (userId: string, currentSubStatus: boolean) => {
    const nextSubStatus = !currentSubStatus;
    
    setLoadingUserId(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSubscribed: nextSubStatus }),
      });

      if (response.ok) {
        setUsers(users.map((u) => u.id === userId ? { ...u, isSubscribed: nextSubStatus } : u));
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-6">
        
        {/* Breadcrumb back */}
        <Link
          href="/admin"
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au dashboard admin
        </Link>

        {/* Header Title */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Gestion des utilisateurs</h1>
            <p className="text-slate-500 text-xs">Administrez les rôles d'accès et activez ou révoquez les abonnements.</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-150 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="px-6 py-4">Nom & Email</th>
                  <th className="px-6 py-4">Rôle</th>
                  <th className="px-6 py-4">Abonnement Premium Plus</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 text-xs font-semibold text-slate-700">
                {users.map((user) => {
                  const isSelf = user.id === currentAdminId;
                  const isPending = loadingUserId === user.id;

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/20 transition">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{user.name || "Sans Nom"}</span>
                          <span className="text-[10px] text-slate-400 font-medium mt-0.5">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {user.role === "ADMIN" ? (
                            <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">
                              Membre
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {user.isSubscribed || user.role === "ADMIN" ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              Actif
                            </span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">
                              Inactif
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isPending ? (
                          <div className="flex justify-end pr-8">
                            <Loader2 className="h-4.5 w-4.5 animate-spin text-blue-500" />
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2.5">
                            {/* Toggle Role Button */}
                            <button
                              onClick={() => handleToggleRole(user.id, user.role)}
                              disabled={isSelf}
                              className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition ${
                                isSelf
                                  ? "bg-slate-50 text-slate-350 border-slate-100 cursor-not-allowed"
                                  : user.role === "ADMIN"
                                  ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                                  : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                              }`}
                            >
                              {user.role === "ADMIN" ? "Retirer Admin" : "Promouvoir Admin"}
                            </button>

                            {/* Toggle Subscription Button */}
                            <button
                              onClick={() => handleToggleSubscription(user.id, user.isSubscribed)}
                              disabled={user.role === "ADMIN"}
                              className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition ${
                                user.role === "ADMIN"
                                  ? "bg-slate-50 text-slate-350 border-slate-100 cursor-not-allowed"
                                  : user.isSubscribed
                                  ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                                  : "bg-emerald-50 border-emerald-250 text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              {user.isSubscribed ? "Désactiver Sub" : "Activer Sub"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
