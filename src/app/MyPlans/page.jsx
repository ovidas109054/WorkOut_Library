
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
    const router = useRouter();

    const exercises =
        activeTab === "today" ? AddTodays : SaveAs;

    const totalMinutes = AddTodays.reduce(
        (total, item) => total + Number(item.duration || 0),
        0
    );

    const totalCalories = AddTodays.reduce(
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

    const handleDone = (id) => {
        markAsDone(id);
        toast.success("Exercise completed!");
    };

    const handleAdd = (item) => {
        const result = addToToday(item);

        if (result) {
            toast.success("Added to today's plan!");
        } else {
            toast.error("Maximum limit reached or already added!");
        }
    };

    return (
        <div className="mx-auto mt-10 w-full max-w-7xl px-4 text-white">
            <h1 className="text-3xl font-bold">MY PLAN</h1>

            <p className="mt-2 text-gray-500">
                Cap of five lifts for today. Finish them, then load more.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-gray-900 p-5">
                    <p className="text-gray-400">Exercises</p>
                    <h2 className="text-2xl text-lime-400">
                        {AddTodays.length}
                    </h2>
                </div>

                <div className="rounded-xl bg-gray-900 p-5">
                    <p className="text-gray-400">Minutes</p>
                    <h2 className="text-2xl">{totalMinutes}</h2>
                </div>

                <div className="rounded-xl bg-gray-900 p-5">
                    <p className="text-gray-400">Calories</p>
                    <h2 className="text-2xl">{totalCalories}</h2>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={() => setActiveTab("today")}
                    className="rounded-lg bg-gray-800 px-4 py-2"
                >
                    Today&apos;s Plan ({AddTodays.length})
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className="rounded-lg bg-gray-800 px-4 py-2"
                >
                    Saved ({SaveAs.length})
                </button>
            </div>

            <div className="mt-5 space-y-3">
                {exercises.length === 0 ? (
                    <div className="rounded-xl border border-gray-800 p-10 text-center">
                        <h2 className="text-xl font-bold">
                            NOTHING HERE YET
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Add an exercise to see it here.
                        </p>

                        

                        <Link
                            href="/WorkOut"
                            className="mt-4 inline-block rounded-lg bg-lime-400 px-4 py-2 text-black hover:scale-105 transition"
                        >
                            Go to Workouts
                        </Link>
                    </div>
                ) : (
                    exercises.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gray-900 p-4"
                        >
                            <div>
                                <h3 className="font-bold">
                                    {item.name ?? item.title}
                                </h3>

                                <p className="text-sm text-gray-400">
                                    {item.duration ?? 0} minutes ·{" "}
                                    {item.calories ?? 0} kcal
                                </p>

                                {item.completed && (
                                    <p className="text-lime-400">
                                        Completed
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() =>
                                        router.push(`/exercise/${item.id}`)
                                    }
                                    className="rounded border border-gray-700 px-3 py-2"
                                >
                                    View Details
                                </button>

                                {activeTab === "today" ? (
                                    <button
                                        onClick={() => handleDone(item.id)}
                                        disabled={item.completed}
                                        className="rounded bg-lime-400 px-3 py-2 text-black disabled:opacity-50"
                                    >
                                        {item.completed
                                            ? "Done"
                                            : "Mark as Done"}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleAdd(item)}
                                        className="rounded bg-lime-400 px-3 py-2 text-black"
                                    >
                                        Add to Plan
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="rounded px-3 py-2 text-red-400"
                                >
                                    X
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
