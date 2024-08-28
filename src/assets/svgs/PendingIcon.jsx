import React from "react";

const PendingIcon = ({
  className = "",
  fill = "#7B1113",
  stroke = "#717179",
  onClick = () => {},
}) => {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      idth="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.57983 0.126498C6.8504 0.0219615 7.1502 0.0219618 7.42076 0.126498L12.9043 2.24514C13.8992 2.62954 13.8992 4.03726 12.9043 4.42166L7.42076 6.5403C7.1502 6.64484 6.8504 6.64484 6.57983 6.5403L1.0963 4.42166C0.101365 4.03726 0.101363 2.62954 1.0963 2.24514L6.57983 0.126498Z"
        fill={fill}
      />
      <path
        d="M12.9043 7.08831L7.42076 9.20694C7.1502 9.31148 6.8504 9.31148 6.57983 9.20694L1.0963 7.08831C0.50339 6.85923 0.263812 6.26674 0.377564 5.74398L6.91205 8.26867C6.93705 8.27832 6.96322 8.28377 6.98955 8.285C6.99555 8.28539 7.00158 8.28545 7.00759 8.28519C7.03562 8.28445 7.06355 8.27894 7.09015 8.26867L13.6232 5.74455C13.7366 6.26717 13.497 6.85931 12.9043 7.08831Z"
        fill={fill}
      />
      <path
        d="M12.9043 9.75497L7.42076 11.8736C7.1502 11.9781 6.8504 11.9781 6.57983 11.8736L1.0963 9.75497C0.50339 9.52589 0.263812 8.93341 0.377564 8.41064L6.91205 10.9353C6.93705 10.945 6.96322 10.9504 6.98955 10.9517C6.99555 10.9521 7.00158 10.9521 7.00759 10.9519C7.03562 10.9511 7.06355 10.9456 7.09015 10.9353L13.6232 8.41122C13.7366 8.93384 13.497 9.52598 12.9043 9.75497Z"
        fill={fill}
      />
    </svg>
  );
};

export default PendingIcon;
