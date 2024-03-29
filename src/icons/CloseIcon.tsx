import React, { FC, SVGProps } from "react";

const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 10.586l4.95-4.95 1.414 1.415-4.95 4.95 4.95 4.95-1.415 1.414-4.95-4.95-4.949 4.95-1.414-1.415 4.95-4.95-4.95-4.95L7.05 5.638l4.95 4.95z" />
    </svg>
);

export default CloseIcon;
