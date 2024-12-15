class Dict {
  static execute(list: string[]) {
    return list.reduce(
      (acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number },
    );
  }
}

export default Dict;
