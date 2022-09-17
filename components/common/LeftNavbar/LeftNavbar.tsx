// ---------------  Next JS imports ----------------
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// --------------- library imports -----------------
import { availableTabs } from "./constants";

// ---------------- styles -------------------------
import styles from "./LeftNavbar.module.css";

// ---------------- components ---------------------
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const LeftNavbar = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<String>("dashboard");
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);
  const [showExpandBtn, setShowExpandBtn] = useState<Boolean>(false);
  const toggleSidebar = (e: EventSource) => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    const pathname = router.pathname;
    setCurrentPage(pathname);
  }, [currentPage]);
  // {styles.container}
  return (
    <div
      className={styles.container + " bg-my-gray-4"}
      onMouseEnter={() => setShowExpandBtn(true)}
      onMouseLeave={() => setShowExpandBtn(false)}
    >
      <div className={styles.logo}>
        <Image
          src={"/images/GIC_logo.svg"}
          height={50}
          width={50}
          layout={"fixed"}
        />
        {isExpanded && (
          <div className={styles.logoText + "  text-my-blue-1"}>GIC</div>
        )}
      </div>
      <div className={styles.tabs}>
        {availableTabs.map(({ name, Icon }) => {
          return (
            <div
              className={`${styles.tab} ${
                "/" + name.toLowerCase() === currentPage ? styles.active : ""
              }`}
              key={name}
              onClick={() => router.push(`/${name.toLowerCase()}`)}
            >
              <div className={styles.tabIcon}>
                <Icon />
              </div>
              {isExpanded && (
                <div className={styles.tabLink}>
                  <Link className={styles.link} href={`/${name.toLowerCase()}`}>
                    {name}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showExpandBtn && (
        <div
          className="absolute top-3 right-[-12px] cursor-pointer bg-white hover:bg-sky-700 drop-shadow p-1 rounded-full"
          onClick={toggleSidebar}
        >
          {isExpanded ? (
            <ArrowForwardIosIcon className="rotate-180 w-4 h-4 " />
          ) : (
            <ArrowForwardIosIcon className="w-4 h-4 " />
          )}
        </div>
      )}
    </div>
  );
};

export default LeftNavbar;
