import {
  Group, LinearGradient, Paint, Paragraph, Rect, RoundedRect, Skia, Text, useFont, useFonts, vec,
} from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { useMemo } from 'react';
import {
  blackKeyColor, whiteKeyColor, pianoKeyboardHeight, keyStrokeWidth, numberOfWhiteKeys, gameWidth, gameHeight, bgColor, screenWidth,
} from './utils';

const PianoKeyboard = () => {
  const keyWidth = gameWidth / numberOfWhiteKeys;

  const noteNameFontSize = 25;
  const noteNameFont = useFont('Inter_600SemiBold.ttf', noteNameFontSize);
  const keyNames = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'];
  const accidentalNames = ['', 'W', 'E', '', 'T', 'Y', 'U', '', 'O', 'P'];

  return <Group>
    {/* BG */}
    <Rect x={-(screenWidth - gameWidth) / 2 } y={gameHeight - pianoKeyboardHeight - keyStrokeWidth / 2} width={screenWidth} height={pianoKeyboardHeight + keyStrokeWidth / 2} color={ bgColor } />

    {/* Draw 11 White keys using a loop */}
    { [...Array(numberOfWhiteKeys)].map((_, i) => {
      const xPos = i * gameWidth / numberOfWhiteKeys;
      const yPos = gameHeight - pianoKeyboardHeight;
      const keyName = keyNames[i];

      const keyNumber = i % 7;
      const hasAnAccidentalBefore = keyNumber === 1 || keyNumber === 2 || keyNumber === 4 || keyNumber === 5 || keyNumber === 6;

      const accidentalName = accidentalNames[i];

      return <Group key={`pianokey_${i}`}>
        <RoundedRect x={xPos} y={yPos} width={keyWidth} height={pianoKeyboardHeight} r={5}>
          <Paint color={ bgColor } style="stroke" strokeWidth={keyStrokeWidth} />
          <LinearGradient
            start={vec(xPos, yPos)}
            end={vec(xPos, yPos + pianoKeyboardHeight)}
            colors={[whiteKeyColor, '#EDEDED']}
          />
        </RoundedRect>
        { hasAnAccidentalBefore && <RoundedRect x={xPos - keyWidth / 4} y={yPos} width={keyWidth / 2} height={pianoKeyboardHeight / 2} r={5} color={ blackKeyColor } /> }
        { hasAnAccidentalBefore && <Text x={xPos - noteNameFontSize / 2.5} y={gameHeight - pianoKeyboardHeight / 2 - noteNameFontSize / 2} text={accidentalName} font={noteNameFont} color={whiteKeyColor} /> }
        {<Text x={xPos + keyWidth / 2 - noteNameFontSize / 4} y={gameHeight - noteNameFontSize / 2} text={keyNames[i]} font={noteNameFont} />}
      </Group>;
    }) }
  </Group>;
};

export default PianoKeyboard;
