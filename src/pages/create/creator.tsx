import React from "react";
import Link from "next/link";

const creator = () => {
  return (
    <div>
      {" "}
      <div>
        <div>
          <Link href="/create/postcreator">
            <button>Lag ny skurpost</button>
          </Link>
        </div>
        <div>
          <Link href="/create/listcreator">
            <button>Rediger skurliste</button>
          </Link>
        </div>
        <div>
          <Link href="/sawbladecreator">
            <button>Legg til sagblad</button>
          </Link>
        </div>
        <div>
          <Link href="/ringcreator">
            <button>Legg til ringer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default creator;
