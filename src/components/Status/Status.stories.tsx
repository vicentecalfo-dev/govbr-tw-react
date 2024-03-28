import Status from ".";

export default {
  component: Status,
  title: "Badge Status",
};

export const Default = () => (
  <div className="flex gap-5">
    <Status>Generic</Status>
    <Status variant="online">Online</Status>
    <Status variant="away">Ausente</Status>
    <Status variant="offline">Offline</Status>
  </div>
);

export const Pulse = () => (
  <div className="flex gap-5">
    <Status pulse>Generic</Status>
    <Status variant="online" pulse>
      Online
    </Status>
    <Status variant="away" pulse>
      Ausente
    </Status>
    <Status variant="offline" pulse>
      Offline
    </Status>
  </div>
);

export const Untagged = () => (
  <div className="flex gap-5">
    <Status pulse></Status>
    <Status variant="online" pulse></Status>
    <Status variant="away" pulse></Status>
    <Status variant="offline" pulse></Status>
  </div>
);

export const CustomColor = () => (
    <div className="flex gap-5">
      <Status className="bg-purple-800"></Status>
      <Status className="bg-purple-800" pulse></Status>
    </div>
  );
