(this.webpackJsonpdizzylotarena=this.webpackJsonpdizzylotarena||[]).push([[0],{23:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var c=n(2),r=n.n(c),o=n(15),a=n.n(o),i=(n(23),n(10)),s=n(8),l=(n(14),n(13),n(17)),u=n(18),d=n(3),j=function(){return g.currentUser&&Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("button",{className:"btn",onClick:function(){return g.signOut()},children:"Sign out"})})},b=function(){var e=g.currentUser.displayName.split(" ",1),t=s.a.firestore(),n=t.collection("users").where("mail","==",g.currentUser.email),c=t.collection("users").doc(g.currentUser.email);c.get().then((function(e){e.exists?console.log("Document data:",e.data()):c.set({mail:g.currentUser.email,totalWins:0}).then((function(){console.log("Document successfully written!")})).catch((function(e){console.error("Error writing document: ",e)}))})).catch((function(e){console.log("Error getting document:",e)}));var r,o=Object(u.a)(n,{idField:g.currentUser.email}),a=Object(i.a)(o,1)[0];return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsxs)("h1",{children:["Hello, ",e]}),Object(d.jsxs)("h3",{children:["Your total wins: ",a&&a[0]?a[0].totalWins:"Loading..."]}),Object(d.jsxs)("h3",{children:["Your rank: ",a&&a[0]?(r=a[0].totalWins,r<1?"Total Noob":r<5?"Noob":r<10?"Garbage":r<20?"Better Garbage":"Decent"):"Loading..."]}),Object(d.jsx)(j,{})]})},h=function(){return Object(d.jsx)("div",{className:"container",children:Object(d.jsx)("button",{className:"btn",onClick:function(){g.signInWithPopup(m)},children:"Sign in with Google"})})};s.a.initializeApp({apiKey:"AIzaSyAL5dV-Vjnt9eMVqGHTxg-SLsmseaACRo8",authDomain:"dizzylotarena-8e56c.firebaseapp.com",projectId:"dizzylotarena-8e56c",storageBucket:"dizzylotarena-8e56c.appspot.com",messagingSenderId:"912379030615",appId:"1:912379030615:web:2bb33038268715ee95c712"});var g=s.a.auth(),m=new s.a.auth.GoogleAuthProvider;var O=function(){var e=Object(l.a)(g),t=Object(i.a)(e,1)[0];return Object(d.jsxs)("main",{children:[Object(d.jsx)("header",{}),Object(d.jsx)("section",{children:t?Object(d.jsx)(b,{auth:g}):Object(d.jsx)(h,{auth:g})})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,28)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))};a.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(O,{})}),document.getElementById("root")),p()}},[[27,1,2]]]);
//# sourceMappingURL=main.09f0bd37.chunk.js.map