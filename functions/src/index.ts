// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// admin.initializeApp();

// export const onTimerCreate = functions.firestore
//     .document("tables/{tables_id}")
//     .onUpdate(async (snapshot, context) => {
//       await sleep(30000);

//       admin.firestore().doc("/tables/"+context.params.tables_id).update({is_call: false});
//       console.log("table",context.params.tables_id,"off")
//     });

// async function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }


