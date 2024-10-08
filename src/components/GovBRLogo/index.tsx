import { VariantProps } from "class-variance-authority";
import govbrLogoVariants from "./variants";
import { ComponentProps, FC } from "react";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";

interface GovBRLogoProps
  extends ComponentProps<"svg">,
    VariantProps<typeof govbrLogoVariants> {
      colors?:Array<string>;
}

const GovBRLogo: FC<GovBRLogoProps> = ({
  className,
  variant = "default",
  colors,
  ...props
}) => {
  let styles = colors !== undefined ? colors :govbrLogoVariants({ variant }).split(" ");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 374.7 134.9"
      className={cn(className, BASE_CLASSNAMES.govbrLogo.root,"w-full")}
      {...props}
    >
      <path
        className={cn(styles[0])}
        d="M40.1,84.7c8.9,0,16-7.5,16-18.7c0-8.1-4.8-17.2-16-17.2c-9.3,0-14.2,8.2-14.2,18.1
   C25.9,78.3,32.6,84.7,40.1,84.7z M80.4,95.5c0,29.8-14.5,39.4-43.8,39.4c-12,0-21.9-2.5-27.7-4.6l1.3-19.8c7.7,3.8,14.1,6,24.5,6
   c14.5,0,22.3-6.8,22.3-21.1v-3.9h-0.3c-6,8.5-14.4,12.4-24.4,12.4C12.4,104,0,88.9,0,67.4c0-21.6,10.2-37.8,32.8-37.8
   c10.7,0,19.4,5.9,24.7,14.8h0.3V31.3h22.7L80.4,95.5L80.4,95.5z"
      />
      <polygon
        className={cn(styles[1])}
        points="181.6,103.9 209.5,103.9 235.8,31.7 211.4,31.7 196.6,83.1 196.3,83.1 181.6,31.7 155.3,31.7 "
      />
      <path
        className={cn(styles[2])}
        d="M139,67.8c0-10.8-4.7-20.4-16.2-20.4c-11.5,0-16.2,9.6-16.2,20.4c0,10.7,4.7,20.2,16.2,20.2
   C134.3,88,139,78.5,139,67.8z M80.8,67.8c0-24,18.1-37.8,42-37.8s42,13.9,42,37.8c0,23.8-18.1,37.7-42,37.7
   C99,105.5,80.8,91.6,80.8,67.8z"
      />
      <path
        className={cn(styles[0])}
        d="M238.6,93.7c0,6.5-5.3,11.8-11.8,11.8c-6.5,0-11.8-5.3-11.8-11.8c0-6.5,5.3-11.8,11.8-11.8
   C233.3,81.8,238.6,87.1,238.6,93.7z"
      />
      <path
        className={cn(styles[0])}
        d="M281,49.2c-9.1,0-15.2,8-15.2,18.8c0,10.5,6.9,18.4,15.2,18.4c9.4,0,15.1-7.9,15.1-19.4
   C296.1,57.5,290.7,49.2,281,49.2z M240.9,0h25.1v41h0.3c6.4-8,14.8-10.9,24.8-10.9c20,0,30.9,19,30.9,36.4c0,21.3-11.5,39.1-33,39.1
   c-11.5,0-21.6-6.5-24.8-14.6h-0.3v12.9h-23L240.9,0L240.9,0z"
      />
      <path
        className={cn(styles[2])}
        d="M373.4,51.7c-2.8-0.8-5.5-0.8-8.5-0.8c-11.6,0-18.1,8.4-18.1,22.6v30.5h-24.9V31.7h22.7V45h0.3
   c4.3-9.1,10.5-15,21.3-15c2.9,0,6,0.4,8.5,0.8L373.4,51.7z"
      />
    </svg>
  );
};

export { GovBRLogo };
