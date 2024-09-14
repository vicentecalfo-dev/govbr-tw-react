import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from ".";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default {
  component: Avatar,
  title: "Avatar",
};

const lightTheme = "flex gap-5 p-5 items-center";
const avatar = {
  vicente: {
    src: "https://media.licdn.com/dms/image/D4D03AQGZ7hKGRT_Aqw/profile-displayphoto-shrink_800_800/0/1696216951627?e=2147483647&v=beta&t=vYhSp05unvUDN_Np-GDfCq8ELlpECHu6AnuQySGrib8",
    title: "Vicente Calfo",
  },
  lucas: {
    src: "https://lsbjordao.netlify.app/author/admin/avatar_hu2be63e1607ba32c3eebd0209533da7ac_2526962_250x250_fill_q90_lanczos_center.jpg",
    title: "Lucas Jordão",
  },
  andre: {
    src: "https://media.licdn.com/dms/image/D4D03AQG-qVYCg_SOYw/profile-displayphoto-shrink_800_800/0/1670503044683?e=2147483647&v=beta&t=1kft_vfzLVoAJlpNDTQP0SXfHe9qDvHrPUc3uTMh9Ag",
    title: "André Eppinghaus",
  },
};

export const Default = () => (
  <>
    <div className={lightTheme}>
      <Avatar title={avatar.vicente.title} initialsSize={2} />
      <Avatar
        src={avatar.vicente.src}
        title={avatar.vicente.title}
        variant="image"
      />
    </div>
  </>
);

export const Sizes = () => (
  <>
    <div className={lightTheme}>
      <Avatar title={avatar.lucas.title} initialsSize={2} />
      <Avatar title={avatar.andre.title} initialsSize={2} size="medium" />
      <Avatar title={avatar.vicente.title} initialsSize={2} size="large" />
      <Avatar
        src={avatar.lucas.src}
        title={avatar.vicente.title}
        variant="image"
      />
      <Avatar
        src={avatar.andre.src}
        title={avatar.vicente.title}
        variant="image"
        size="medium"
      />
      <Avatar
        src={avatar.vicente.src}
        title={avatar.vicente.title}
        variant="image"
        size="large"
      />
    </div>
  </>
);

export const Icons = () => (
  <>
    <div className={lightTheme}>
      <Avatar title={avatar.lucas.title} initialsSize={2}>
        <FontAwesomeIcon icon={faUser} />
      </Avatar>
      <Avatar title={avatar.andre.title} initialsSize={2} size="medium">
        {" "}
        <FontAwesomeIcon icon={faUser} />
      </Avatar>
      <Avatar title={avatar.vicente.title} initialsSize={2} size="large">
        {" "}
        <FontAwesomeIcon icon={faUser} />
      </Avatar>
    </div>
  </>
);

export const CustomSize = () => (
  <>
    <div className={lightTheme}>
      <Avatar
        title={avatar.lucas.title}
        initialsSize={2}
        className="size-[250px] text-8xl"
      />
      <Avatar
        title={avatar.andre.title}
        src={avatar.andre.src}
        className="size-[250px] text-8xl"
      />
    </div>
  </>
);
