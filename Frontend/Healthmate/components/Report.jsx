import React, { useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    IndianRupee,
    FileUp,
    StickyNote,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddReport() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        testName: "",
        date: "",
        price: "",
        notes: "",
        files: [],
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "files") {
            setFormData({ ...formData, files: Array.from(files) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.testName.trim() || !formData.date || !formData.notes.trim()) {
            console.warn("Please fill in all required fields!");
            return;
        }

        try {
            let res;

            // If files present, send as multipart/form-data
            if (formData.files && formData.files.length > 0) {
                const fd = new FormData();
                fd.append("title", formData.title || "Untitled Report");
                fd.append("type", "Medical");
                fd.append("testName", formData.testName);
                fd.append("date", formData.date);
                fd.append("price", formData.price);
                fd.append("notes", formData.notes);
                for (const file of formData.files) {
                    fd.append("files", file);
                }

                res = await fetch("http://localhost:5000/api/reports", {
                    method: "POST",
                    body: fd, // browser sets Content-Type including boundary
                });
            } else {
                // No files: send JSON
                const payload = {
                    title: formData.title || "Untitled Report",
                    type: "Medical",
                    testName: formData.testName,
                    date: formData.date,
                    price: formData.price,
                    notes: formData.notes,
                };

                res = await fetch("http://localhost:5000/api/reports", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            if (!res.ok) {
                const errText = await res.text().catch(() => "");
                console.error("Failed to add report:", res.status, errText);
                return;
            }

            // parse response if needed
            try {
                await res.json();
            } catch {
                // ignore non-JSON responses
            }

            // silent success: navigate back
            navigate(-1);
        } catch (err) {
            console.error("Error submitting report:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col items-center py-4 px-4">
            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl w-full max-w-3xl p-4 space-y-5"
            >
                {/* Header */}
                <div className="w-full max-w-3xl flex items-center justify-between mb-8">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </button>

                    <h1 className="text-2xl font-semibold text-gray-800">Add new report</h1>

                    <div className="w-12"></div> {/* spacing */}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">
                            Title (optional)
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Ultrasound Abdomen"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                        />
                    </div>

                    {/* Test Name */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Test name *</label>
                        <input
                            type="text"
                            name="testName"
                            placeholder="Ultrasound / X-ray / CBC / ABG"
                            value={formData.testName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                        />
                    </div>
                </div>

                {/* File Upload */}

                {/* .......................................................... */}

                <div>
                    <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <FileUp size={16} className="text-pink-500" /> Files (optional)
                    </label>
                    <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleChange}
                        className="block w-full text-gray-700 text-sm"
                    />
                </div>

                {/* ........................................................... */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Date */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <CalendarDays size={16} className="text-pink-500" /> Date *
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <IndianRupee size={16} className="text-pink-500" /> Price (Rs)
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="e.g. 3500"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                        />
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <StickyNote size={16} className="text-pink-500" /> Additional notes *
                    </label>
                    <textarea
                        name="notes"
                        placeholder="Symptoms, instructions, etc."
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none resize-none"
                    ></textarea>
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition"
                    >
                        Save Report
                    </button>
                </div>
            </form>
        </div>
    );
}
