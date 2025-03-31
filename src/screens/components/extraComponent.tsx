import {
  Breadcrumb,
  Typography,
} from "@bcp-nextgen-dx-component-factory/design-system";
import React from "react";

export const Extra: React.FC = () => {
  return (
    <div style={{ color: "white" }} className="p-3">
      <Breadcrumb
        breadcrumbs={[
          {
            onPress: function noRefCheck() {},
            text: "CRÉDITOS",
          },
          {
            onPress: function noRefCheck() {},
            text: "CARTEIRA",
          },
          {
            onPress: function noRefCheck() {},
            text: "GARANTIAS E AVALES",
          },
        ]}
      />
      <Typography appearance="headline-100-03">Garantias e Avales</Typography>
    </div>
  );
};
