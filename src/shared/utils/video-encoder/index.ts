type TextProps = {
    /**
     * text content
     */
    text: string;
    /**
     * size of the text
     */
    fontSize: number;
    /**
     * x position of the text
     */
    x?: number;
    /**
     * y position of the text
     */
    y?: number;
    // color: string;
};

export type AnimationFrameData = {
    /**
     * image of this animation frame
     */
    image: HTMLImageElement;
    /**
     * text label to be added for this animation frame
     */
    textLabel: TextProps;
};
