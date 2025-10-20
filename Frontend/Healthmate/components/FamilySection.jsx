import React from "react";

export default function FamilySection({ user, familyMembers }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Family Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* ✅ Self Card */}
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-lg font-bold mb-2">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h3 className="font-semibold text-gray-800">YOU</h3>
          <p className="text-sm text-gray-500">Self</p>
        </div>

        {/* 👨‍👩‍👧‍👦 Other family members */}
        {familyMembers.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-bold mb-2">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500">Family Member</p>
          </div>
        ))}
      </div>
    </div>
  );
}

