var 
  h = 6, // # playoff outcomes
  w = 30, // # of max streaks
rects = [],
;

// initialize rects
for(var i = 0; i < h * w; i++){
  rects.push({
    x: i % w,
    y: Math.floor(i / h),
    value: 5
  });
}
