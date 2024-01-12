jest.mock("nanoid", () => { 
    return {
        nanoid : jest.fn(() => 'abc')
    }
});
