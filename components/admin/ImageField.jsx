"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { api } from "@/components/admin/api";
import { Btn, Input, Label, useToast } from "@/components/admin/ui";

/**
 * Cover-image field for the project and article forms.
 *
 * Uploads through /api/v1/uploads so the Cloudinary secret stays on the
 * server, then shows the returned URL with an option to paste one by hand.
 */
export default function ImageField({ value, onChange, folder, label = "Cover image", hint }) {
  const toast = useToast();
  const picker = useRef(null);

  const [busy, setBusy] = useState(false);

  async function handleFile(file) {
    if (!file) return;

    setBusy(true);

    try {
      const uploaded = await api.uploads.image(file, folder);
      onChange(uploaded.url);
      toast.push("Image uploaded");
    } catch (error) {
      toast.push(error.message, "error");
    } finally {
      setBusy(false);
      if (picker.current) picker.current.value = "";
    }
  }

  return (
    <div>
      <Label label={label} hint={hint}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div
            className="relative flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sand/45 sm:w-40"
            style={{ border: "1px solid var(--a-line)" }}
          >
            {value ? (
              <>
                <img src={value} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChange("")}
                  aria-label="Remove cover image"
                  className="a-focus absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#fffdf9]/95 text-[#b4504a] shadow-[var(--a-shadow)]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <ImageIcon className="h-6 w-6 text-muted" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <input
              ref={picker}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />

            <Btn
              className="w-full gap-1.5"
              onClick={() => picker.current?.click()}
              disabled={busy}
            >
              {busy ? (
                <Loader2 className="h-4 w-4 a-spin" aria-hidden="true" />
              ) : (
                <Upload className="h-4 w-4" aria-hidden="true" />
              )}
              {busy ? "Uploading…" : "Upload image"}
            </Btn>

            <Input
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="/path/to/image.jpg or https://…"
              aria-label={`${label} URL`}
            />
          </div>
        </div>
      </Label>
    </div>
  );
}