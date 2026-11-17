import React, { useContext } from "react";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";
import { ThemeContext } from "../../api/Theme";
import {
  ExploreOutlined,
  HomeOutlined,
  PlaylistPlay,
  ChatBubbleOutline,
  AllInclusiveOutlined,
  ExtensionOutlined,
  Favorite,
  Money,
  MusicVideo,
  Add,
  AttachMoney,
} from "@material-ui/icons";
import { useSelector } from "react-redux";

function SideBar() {
  const useStyle = useContext(ThemeContext);
  const user = useSelector((state) => state?.musicReducer?.user);

  return (
    <aside style={useStyle.component} className={"aside-bar"}>
      <div className="aside-bar-container">
        <p className={"p1"}>
          <span>LIBRARY</span>
        </p>
        <SideBarOptions
          className={"lib-sub"}
          Icon={HomeOutlined}
          href={"/home"}

          // href={!user ? "/signin" : "/home"}
          title={"Home"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={ExtensionOutlined}
          href={!user ? "/signin" : "/chat"}
          title={"Create Band"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={AllInclusiveOutlined}
          href={!user ? "/signin" : "/rooms"}
          title={"All Bands"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={Add}
          href={!user ? "/signin" : "/upload"}
          title={"Become an Artist"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={AttachMoney}
          // href={"/premiumplans"}
          href={!user ? "/signin" : "/premiumplans"}
          title={"Premium Plans"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={ExploreOutlined}
          href={!user ? "/signin" : "/about"}
          title={"About"}
        />

        {/* <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/search"}  title={"Search"}/> */}
        {/*<SideBarOptions className={"lib-sub"} Icon={AlbumIcon} href={"/home/album"}  title={"Album"}/>
                <SideBarOptions className={"lib-sub"} Icon={EmojiPeopleIcon} href={"/home/artist"}  title={"Artist"}/>*/}
      </div>

      <div className="aside-bar-container playlist">
        <p className={"p1"}>
          <span>Songs</span>
        </p>

        <SideBarOptions
          className={"lib-sub"}
          Icon={MusicVideo}
          href={!user ? "/signin" : "/uploadedsongs"}
          title={"My Uploads"}
        />

        <SideBarOptions
          className={"lib-sub"}
          Icon={Favorite}
          href={!user ? "/signin" : "/likedsongs"}
          title={"Liked Songs"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={Money}
          href={"/premiumsongs"}
          title={"Discover Talent"}
        />
      </div>

      <div className="aside-bar-container playlist">
        <p className={"p1"}>
          <span>Categories</span>
        </p>
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/piano"}
          title={"Piano"}
        />
        {/* <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/electronic"} title={"Electronic"} /> */}
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/vocalist"}
          title={"Vocalist"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/guitarist"}
          title={"Guitarist"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/bassist"}
          title={"Bassist"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/drummer"}
          title={"Drummer"}
        />
        {/* <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/keyboardist"}
          title={"Keyboardist"}
        /> */}
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/violinist"}
          title={"Violinist"}
        />
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/flutist"}
          title={"Flutist"}
        />
        {/* <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/saxophonist"}
          title={"Saxophonist"}
        /> */}
        <SideBarOptions
          className={"lib-sub"}
          Icon={PlaylistPlay}
          href={!user ? "/signin" : "/rapper"}
          title={"Rapper"}
        />
      </div>
    </aside>
  );
}

/*
 *
 * */
export default SideBar;
