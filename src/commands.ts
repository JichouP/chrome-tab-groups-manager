export const onCommand = (_command: string): void => {
  const command = isCommand(_command);
  if (!command) {
    return;
  }
  switch (command) {
    case 'move_left':
      return;
    case 'move_right':
      return;
  }
};

export const isCommand = (command: string): Command | void => {
  if (command !== 'move_left' && command !== 'move_right') {
    return;
  }
  return command as Command;
};
