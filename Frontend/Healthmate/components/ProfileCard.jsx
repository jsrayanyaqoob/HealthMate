import React from "react";
import { Edit2, Trash2, Eye, User } from "lucide-react";

export default function ProfileCard({
  title = "You",
  subtitle = "Self",
  onEdit,
  onDelete,
  onOpen,
}) {
  return (
    <div className="max-w-xs w-full bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-orange-300 flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 rounded-md bg-white/30 flex items-center justify-center">
              <User size={18} color="white" />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900">{title}</div>
            <div className="text-xs text-gray-400">{subtitle}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center gap-2 justify-center py-2 rounded-xl border border-pink-200 text-pink-600 text-sm hover:bg-pink-50"
        >
          <Edit2 size={14} />
          <span>Edit</span>
        </button>

        <button
          onClick={onDelete}
          className="flex-1 flex items-center gap-2 justify-center py-2 rounded-xl border border-pink-200 text-pink-600 text-sm hover:bg-pink-50"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>

        <button
          onClick={onOpen}
          className="flex-1 flex items-center gap-2 justify-center py-2 rounded-xl bg-pink-500 text-white text-sm shadow-md hover:brightness-95"
        >
          <Eye size={14} />
          <span>Open</span>
        </button>
      </div>
    </div>
  );
}
