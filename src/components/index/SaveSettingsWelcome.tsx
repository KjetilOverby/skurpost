import React from "react";

interface SaveSettingsWelcomeProps {
  handler: () => void;
}

const SaveSettingsWelcome: React.FC<SaveSettingsWelcomeProps> = ({
  handler,
}) => {
  return (
    <div className="grid min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl text-gray-600">Velkommen til Postarkiv</h1>
        <p className="text-gray-600">Klikk på start for å begynne</p>
        <button onClick={handler} className="btn btn-primary">
          START
        </button>
      </div>
    </div>
  );
};

export default SaveSettingsWelcome;
