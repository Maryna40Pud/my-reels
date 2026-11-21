import { AbsoluteFill, Series } from "remotion";
import { Background } from "./Background";
import { AutopilotScene } from "./AutopilotScene";
import { FirstThingsScene } from "./FirstThingsScene";
import { FirstBreathScene } from "./FirstBreathScene";
import { MantraScene } from "./MantraScene";
import { InviteScene } from "./InviteScene";

export const BreatheReel: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence name="Autopilot" durationInFrames={120}>
          <AutopilotScene />
        </Series.Sequence>
        <Series.Sequence name="First things" durationInFrames={120}>
          <FirstThingsScene />
        </Series.Sequence>
        <Series.Sequence name="First breath" durationInFrames={150}>
          <FirstBreathScene />
        </Series.Sequence>
        <Series.Sequence name="Mantra" durationInFrames={150}>
          <MantraScene />
        </Series.Sequence>
        <Series.Sequence name="Invite" durationInFrames={180}>
          <InviteScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
