// function evaluateMCQ(userAnswers, correctAnswers) {
//   let score = 0;

//   for (let i = 0; i < correctAnswers.length; i++) {
//     const correct = correctAnswers[i];
//     const user = userAnswers.find((ans) => ans.id === correct.id);

//     if (!user) continue;

//     const correctAns = correct.correct;
//     const userAns = user.answer;
//     const wrongAns = [];

//     if (Array.isArray(correctAns)) {
//       const isMatch =
//         Array.isArray(userAns) &&
//         correctAns.length === userAns.length &&
//         correctAns.every((ans) => userAns.includes(ans));

//       if (isMatch) score++;
//       else {
//         const halfmatch = correctAns.some((ans) => userAns.includes(ans));
//         if (halfmatch) score += 0.5;
//         else wrongAns.push(correct.id);
//       }
//     } else {
//       if (userAns === correctAns) score++;
//       else wrongAns.push(correct.id);
//     }
//   }

//   return {
//     score,
//     examValue: score >= 8 ? 1 : 0,
//     wrongAns,
//   };
// }
