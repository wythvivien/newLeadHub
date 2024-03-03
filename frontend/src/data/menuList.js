import { BiSolidDashboard, BiTask } from "react-icons/bi";
import { FaUsers, FaGripfire } from "react-icons/fa";
import {
  MdViewKanban,
  MdPending,
  MdCalendarMonth,
  MdOutlineViewCarousel,
  MdOutlineWork,
} from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { IoPieChartSharp } from "react-icons/io5";
import { BsSnow2 } from "react-icons/bs";

const tabList = [
  {
    icon: BiSolidDashboard,
    inside: [
      {
        item: "Overview",
        link: "overview",
        icon: MdOutlineViewCarousel,
      },
      {
        item: "Analytics",
        link: "analytics",
        icon: IoPieChartSharp,
      },
    ],
  },

  {
    icon: FaUsers,
    inside: [
      {
        item: "Pipeline",
        link: "pipeline",
        icon: MdViewKanban,
      },
      {
        item: "Warm",
        link: "warm",
        icon: FaGripfire,
      },
      {
        item: "Cold",
        link: "cold",
        icon: BsSnow2,
      },
      {
        item: "Dead",
        link: "dead",
        icon: MdPending,
      },
    ],
  },

  {
    icon: BiTask,
    inside: [
      {
        item: "Calendar",
        link: "calendar",
        icon: MdCalendarMonth,
      },
      {
        item: "Tasks",
        link: "tasks",
        icon: IoIosListBox,
      },
      {
        item: "Projects",
        link: "projects",
        icon: MdOutlineWork,
      },
    ],
  },
];

const actionList = [
  { action: "Create Lead", type: "SET_CREATE_LEAD" },
  { action: "Send Email", type: "SET_SEND_EMAIL" },
];

export { tabList, actionList };
