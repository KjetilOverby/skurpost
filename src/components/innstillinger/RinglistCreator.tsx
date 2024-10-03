import React, { useState } from "react";

interface RinglistCreatorProps {
  ringlist: number[];
  update: (newRinglist: number[]) => Promise<void>;
}

const RinglistCreator: React.FC<RinglistCreatorProps> = ({
  ringlist,
  update,
}) => {
  const [newRingValue, setNewRingValue] = useState<number | "">("");
  const [deletingRing, setDeletingRing] = useState<number | null>(null);

  const handleAddRing = async () => {
    if (newRingValue === "" || isNaN(newRingValue)) return;

    // Check for duplicates
    if (ringlist.includes(newRingValue)) {
      alert("Denne verdien eksisterer allerede i listen");
      return;
    }

    const updatedRinglist = [...ringlist, newRingValue];
    try {
      await update(updatedRinglist);
      setNewRingValue(""); // Clear the input field after adding
    } catch (error) {
      console.error("Failed to update ring list:", error);
    }
  };

  const handleDeleteRing = async (ringToDelete: number) => {
    setDeletingRing(ringToDelete);

    const updatedRinglist = ringlist.filter((ring) => ring !== ringToDelete);
    try {
      await update(updatedRinglist);
      setDeletingRing(null);
    } catch (error) {
      console.error("Failed to update ring list:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddRing().catch((error) =>
      console.error("Failed to add ring:", error),
    );
  };

  return (
    <div className="mb-10 rounded-xl border border-primary p-5">
      <h1 className="mb-5">Ringer</h1>
      <p className="mb-3 text-xs">
        Legg til ringer. Klikk på en ring for å fjerne den. Ringene blir lagt i
        stigende rekkefølge.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="ringverdi"
          value={newRingValue}
          onChange={(e) => setNewRingValue(parseFloat(e.target.value))}
          className="input input-bordered mb-3"
        />
        <button
          type="submit"
          className="btn ml-5 rounded-md bg-accent p-2 text-primary"
        >
          Legg til
        </button>
        <div className="mt-5 flex flex-wrap gap-2">
          {ringlist
            ?.sort((a, b) => a - b) // Sorterer listen før rendering
            .map((ring) => (
              <div
                key={ring}
                className="flex h-8 w-16 cursor-pointer items-center justify-center rounded-md border border-primary bg-base-100 text-primary"
                onClick={() =>
                  handleDeleteRing(ring).catch((error) =>
                    console.error("Failed to delete ring:", error),
                  )
                }
              >
                <p>{ring}</p>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default RinglistCreator;
