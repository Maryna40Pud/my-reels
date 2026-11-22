import { Composition, Folder } from "remotion";
import { BreatheReel } from "./breathe/BreatheReel";
import { AutopilotScene } from "./breathe/AutopilotScene";
import { FirstThingsScene } from "./breathe/FirstThingsScene";
import { FirstBreathScene } from "./breathe/FirstBreathScene";
import { MantraScene } from "./breathe/MantraScene";
import { InviteScene } from "./breathe/InviteScene";
import { TalkingReel } from "./talking/TalkingReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TalkingReel"
        component={TalkingReel}
        durationInFrames={2250}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BreatheReel"
        component={BreatheReel}
        durationInFrames={720}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="BreatheReel-Scenes">
        <Composition
          id="Autopilot"
          component={AutopilotScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FirstThings"
          component={FirstThingsScene}
          durationInFrames={120}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="FirstBreath"
          component={FirstBreathScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mantra"
          component={MantraScene}
          durationInFrames={150}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Invite"
          component={InviteScene}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
