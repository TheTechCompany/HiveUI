# HiveUI

## Get Started

```
yarn add @hexhive/ui
```

```App.tsx
import { ColorDot } from '@hexhive/ui';

return (
    <ColorDot size={5} color={'red'} />
)
```

## Documentation

Each component has a README.md in it's folder explaining usage and props

[Storybook](https://thetechcompany.github.io/HiveUI/)

## Contributing

```
git clone https://github.com/TheTechCompany/HiveUI
cd HiveUI
yarn
yarn storybook
```

- Create a branch feat/component
- Create a folder under views/ modals/ or components/ containing the module logic
- Create a test for the component is src/__tests__
- Create a storybook file named $Component.stories.tsx in the parent folder for the module

Make a pull request to staging once your component is ready for integration, merges to master will be done on a weekly basis or as needed