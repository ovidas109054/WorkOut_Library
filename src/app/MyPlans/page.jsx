
"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ExContext } from "../context/ExProvider";
import { toast } from "react-toastify";
import Link from "next/link";

const MyPlan = () => {
    const {
        AddTodays,
        SaveAs,
        addToToday,
        removeFromToday,
        removeFromSaved,
        markAsDone,
    } = useContext(ExContext);

    const [activeTab, setActiveTab] = useState("today");
    const [sortBy, setSortBy] = useState("duration");
    const router = useRouter();

    const exercises = activeTab === "today" ? AddTodays : SaveAs;

    const sortedExercises = [...exercises].sort((a, b) => {
        if (sortBy === "duration") {
            return Number(a.duration || 0) - Number(b.duration || 0);
        }

        if (sortBy === "calories") {
            return Number(a.caloriesBurned || 0) - Number(b.caloriesBurned || 0);
        }

        return Number(b.rating || 0) - Number(a.rating || 0);
    });

    const totalMinutes = exercises.reduce(
        (total, item) => total + Number(item.duration || 0),
        0
    );

    const totalCalories = exercises.reduce(
        (total, item) => total + Number(item.caloriesBurned || 0),
        0
    );

    const handleRemove = (id) => {
        if (activeTab === "today") {
            removeFromToday(id);
        } else {
            removeFromSaved(id);
        }

        toast.success("Exercise removed!");
    };

    const handleDone = (item) => {
        markAsDone(item.id);

        toast.success(
            item.completed
                ? "Exercise marked as incomplete!"
                : "Exercise completed!"
        );
    };

    const handleAdd = (item) => {
        const result = addToToday(item);

        if (result === "success") {
            toast.success("Added to today's plan!");
        } else if (result === "duplicate") {
            toast.warning("This exercise is already in today's plan!");
        } else if (result === "limit") {
            toast.error("Your plan is full! Remove an exercise first.");
        } else {
            toast.error("Could not add this exercise.");
        }
    };

    return (
        <div className="mx-auto mt-10 w-full max-w-7xl px-4 text-white">
            <h1 className="text-3xl font-bold">MY PLAN</h1>

            <p className="mt-2 text-gray-400">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-gray-400">Exercises</p>
                    <h2 className="text-2xl font-bold text-lime-400">
                        {exercises.length}
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-gray-400">Minutes</p>
                    <h2 className="text-2xl font-bold">{totalMinutes}</h2>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-gray-400">Calories</p>
                    <h2 className="text-2xl font-bold">{totalCalories}</h2>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="mt-6 mb-6 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-xl border border-gray-700 bg-gray-900 p-1.5">
                    <button
                        onClick={() => setActiveTab("today")}
                        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${activeTab === "today" ? "bg-lime-400 text-black" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                        Today&apos;s Plan
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${activeTab === "saved" ? "bg-lime-400 text-black" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                        Saved
                    </button>
                </div>

                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                    <div className="flex items-center gap-3">
                        <label htmlFor="sortBy" className="text-sm text-gray-400">
                            Sort By
                        </label>

                        <div className="relative">
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none rounded-lg border border-gray-700 bg-gray-900 py-2 pl-3 pr-10 text-sm text-white outline-none hover:border-lime-400 focus:border-lime-400"
                            >
                                <option value="duration">Duration</option>
                                <option value="calories">Calories</option>
                                <option value="rating">Rating</option>
                            </select>

                            <svg
                                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>


            <div className="space-y-3">
                {sortedExercises.length === 0 ? (
                    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-10 text-center">
                        <h2 className="text-xl font-bold">
                            {activeTab === "today"
                                ? "YOUR PLAN IS EMPTY"
                                : "NO SAVED EXERCISES"}
                        </h2>

                        <p className="mt-2 text-gray-400">
                            {activeTab === "today"
                                ? "Explore the workout library and add exercises to your plan."
                                : "Save exercises from the workout library to find them here."}
                        </p>

                        <Link
                            href="/WorkOut"
                            className="mt-4 inline-block rounded-lg bg-lime-400 px-4 py-2 font-medium text-black transition hover:scale-105"
                        >
                            Go to Workouts
                        </Link>
                    </div>
                ) : (
                    sortedExercises.map((item) => (
                        <div
                            key={item.id}
                            className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 ${item.completed
                                    ? "border-lime-400/30 bg-gray-900/60"
                                    : "border-gray-800 bg-gray-900"
                                }`}
                        >
                            <div className="min-w-0 flex-1">
                                <h3
                                    className={`font-bold ${item.completed
                                            ? "text-gray-400 line-through"
                                            : "text-white"
                                        }`}
                                >
                                    {item.name ?? item.title}
                                </h3>

                                <p className="mt-1 text-sm text-gray-400">
                                    {item.duration ?? 0} minutes ·{" "}
                                    {item.caloriesBurned ?? 0} kcal
                                </p>

                                {item.completed && activeTab === "today" && (
                                    <p className="mt-1 text-sm text-lime-400">
                                        Exercise completed
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => router.push(`/WorkOut/${item.id}`)}
                                    className="rounded-lg border border-gray-700 px-3 py-2 text-sm transition hover:border-lime-400 hover:text-lime-400"
                                >
                                    View Details
                                </button>

                                {activeTab === "today" ? (
                                    <button
                                        onClick={() => handleDone(item)}
                                        className="rounded-lg bg-lime-400 px-3 py-2 text-sm font-medium text-black transition hover:bg-lime-300"
                                    >
                                        {item.completed ? "Undo Done" : "Mark as Done"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAdd(item)}
                                        className="rounded-lg bg-lime-400 px-3 py-2 text-sm font-medium text-black transition hover:bg-lime-300"
                                    >
                                        Add to Plan
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    aria-label={`Remove ${item.name ?? item.title}`}
                                    className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyPlan;
