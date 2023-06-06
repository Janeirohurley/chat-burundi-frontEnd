import { Avatar, IconButton, Stack } from "@mui/material";
import { DotsThree } from "phosphor-react";
import React from "react";
import "./converisations.css";
const Converisations = () => {
  return (
    <div>
      <div className="talk right">
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
        <p className="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla enim
          laboriosam sunt harum temporibus placeat consequatur voluptatum
          tenetur incidunt soluta culpa iure deleniti dicta libero hic,
          obcaecati dolore eveniet aspernatur.
        </p>
      </div>
      <div className="talk left">
        <p className="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          dolore.
        </p>
        <Stack direction={"column"} alignItems={"right"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
      </div>
      <div className="talk right">
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
        <p className="p">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
      <div className="talk left">
        <p className="p">fuck u</p>
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
      </div>
      <div className="talk left">
        <p className="p">
          fuck u 🧡🧡🧡❤ Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Explicabo sunt a autem amet, soluta veniam tempore laudantium
          delectus ut minus harum dolores recusandae porro molestiae reiciendis
          iusto voluptas impedit tempora. Lorem. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Rem, possimus eligendi.
        </p>
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
      </div>
      <div className="talk left">
        <p className="p">fuck u</p>
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
      </div>
      <div className="talk left">
        <p className="p">fuck u</p>
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
      </div>
      <div className="talk right">
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
        <p className="p">fuck u Lorem ipsum dolor</p>
      </div>
      <div className="talk right">
        <Stack direction={"column"} alignItems={"center"} gap={1}>
          <Avatar />
          <IconButton
            sx={{
              padding: "0",
              width: "1.2rem",
              margin: "0",
              height: "1.2rem",
            }}
          >
            {" "}
            <DotsThree />
          </IconButton>
        </Stack>
        <p className="p">💛</p>
      </div>
    </div>
  );
};
export default Converisations;
