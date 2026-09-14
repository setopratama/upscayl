import { enableContributionAtom } from "@/atoms/user-settings-atom";
import { useAtomValue } from "jotai";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

const PostHogProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const enableContribution = useAtomValue(enableContributionAtom);

  useEffect(() => {
    if (enableContribution === false) {
      return;
    }

    posthog.init("phc_QMcmlmComdofjfaRPzoN4KV9ziV2KgOwAOVyu4J3dIc", {
      api_host: "https://us.i.posthog.com",
      person_profiles: "always",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      disable_surveys: true,
      disable_web_experiments: true,
      advanced_disable_decide: true,
      advanced_disable_feature_flags: true,
      advanced_disable_feature_flags_on_first_load: true,
      feature_flag_request_timeout_ms: 15000,
      loaded: async (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
        const systemInfo = await window.electron.getSystemInfo();
        const appVersion = await window.electron.getAppVersion();
        // Set super properties that will be included with all events
        posthog.register({
          ...systemInfo,
          appVersion,
        });
        // Capture initial session start
        posthog.capture("app_launched", {
          ...systemInfo,
          appVersion,
        });
      },
    });
  }, [enableContribution]);

  if (enableContribution === false) return <>{children}</>;

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PostHogProviderWrapper;
