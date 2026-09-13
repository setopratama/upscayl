import { translationAtom } from "@/atoms/translations-atom";
import { keepOriginalFilenameAtom } from "@/atoms/user-settings-atom";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

const KeepOriginalFilenameToggle = () => {
  const [keepOriginalFilename, setKeepOriginalFilename] = useAtom(
    keepOriginalFilenameAtom,
  );
  const t = useAtomValue(translationAtom);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">
        {t("SETTINGS.KEEP_ORIGINAL_FILENAME.TITLE")}
      </p>
      <p className="text-xs text-base-content/80">
        {t("SETTINGS.KEEP_ORIGINAL_FILENAME.DESCRIPTION")}
      </p>
      <input
        type="checkbox"
        className="toggle"
        checked={keepOriginalFilename}
        onChange={() => {
          setKeepOriginalFilename((oldValue: boolean) => {
            if (oldValue) {
              localStorage.removeItem("keepOriginalFilename");
              return false;
            } else {
              return true;
            }
          });
          localStorage.setItem(
            "keepOriginalFilename",
            JSON.stringify(!keepOriginalFilename),
          );
        }}
      />
    </div>
  );
};

export default KeepOriginalFilenameToggle;
